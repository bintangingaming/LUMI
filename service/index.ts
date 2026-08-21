import type { IOnCompleted, IOnData, IOnError, IOnFile, IOnMessageEnd, IOnMessageReplace, IOnNodeFinished, IOnNodeStarted, IOnThought, IOnWorkflowFinished, IOnWorkflowStarted } from './base'
import { get, post, ssePost } from './base'
import type { Feedbacktype } from '@/types/app'
import { API_PREFIX } from '@/config'

export const sendChatMessage = async (
  body: Record<string, any>,
  {
    onData,
    onCompleted,
    onThought,
    onFile,
    onError,
    getAbortController,
    onMessageEnd,
    onMessageReplace,
    onWorkflowStarted,
    onNodeStarted,
    onNodeFinished,
    onWorkflowFinished,
  }: {
    onData: IOnData
    onCompleted: IOnCompleted
    onFile: IOnFile
    onThought: IOnThought
    onMessageEnd: IOnMessageEnd
    onMessageReplace: IOnMessageReplace
    onError: IOnError
    getAbortController?: (abortController: AbortController) => void
    onWorkflowStarted: IOnWorkflowStarted
    onNodeStarted: IOnNodeStarted
    onNodeFinished: IOnNodeFinished
    onWorkflowFinished: IOnWorkflowFinished
  },
) => {
  return ssePost('chat-messages', {
    body: {
      ...body,
      response_mode: 'streaming',
    },
  }, { onData, onCompleted, onThought, onFile, onError, getAbortController, onMessageEnd, onMessageReplace, onNodeStarted, onWorkflowStarted, onWorkflowFinished, onNodeFinished })
}

export const fetchConversations = async () => {
  return get('conversations', { params: { limit: 100, first_id: '' } })
}

export const fetchChatList = async (conversationId: string) => {
  return get('messages', { params: { conversation_id: conversationId, limit: 20, last_id: '' } })
}

// init value. wait for server update
export const fetchAppParams = async () => {
  return get('parameters')
}

export const updateFeedback = async ({ url, body }: { url: string, body: Feedbacktype }) => {
  return post(url, { body })
}

export const generationConversationName = async (id: string) => {
  return post(`conversations/${id}/name`, { body: { auto_generate: true } })
}

// Fungsi upload file yang baru menggunakan fetch API standar (aman & tidak error 'open')
export const sendFiles = async ({ file }: { file: File }) => {
  const formData = new FormData()
  formData.append('file', file)

  const urlPrefix = API_PREFIX
  const response = await globalThis.fetch(`${urlPrefix}/file-upload`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    throw new Error(errorText || 'Gagal mengunggah file')
  }

  // Ambil respon sebagai teks dulu untuk mencegah error JSON parsing
  const textResponse = await response.text()

  try {
    // Coba parse ke JSON kalau bentuknya JSON
    const json = JSON.parse(textResponse)
    return json
  } catch {
    // Kalau server cuma balikin string ID mentah, bungkus jadi objek
    return { id: textResponse }
  }
}
