import type {
  ChatCompletion,
  ChatCompletionMessageParam,
} from 'openai/resources/index.mjs'
import { openai } from '~/server/utils/openai'

export default defineEventHandler<Promise<ChatCompletion>>(async (event) => {
  const { model = 'gpt-4o-mini', prompt, systemMessage } = await readBody(event)

  if (!prompt) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Valid prompt is required',
    })
  }

  return await openai.chat.completions.create({
    model,
    messages: [
      ...(systemMessage
        ? [
            {
              role: 'system',
              content: systemMessage,
            },
          ]
        : []),
      {
        role: 'user',
        content: prompt,
      },
    ] as ChatCompletionMessageParam[],
  })
})
