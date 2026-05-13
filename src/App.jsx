import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { 
  generateText, 
  imageToText, 
  visualQuestionAnswering, 
  imageClassification,
  objectDetection,
  imageSegmentation,
  textToSpeech,
  automaticSpeechRecognition,
  translateText,
  summarizeText
} from '../lib/huggingface'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [audioBlob, setAudioBlob] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const addMessage = (text, isUser = false, type = 'text') => {
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text, 
      isUser, 
      isTyping: !isUser && type !== 'text',
      type
    }])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() && !uploadedFile && !audioBlob) return

    setIsLoading(true)

    try {
      switch (activeTab) {
        case 'chat':
          await handleChatSubmit()
          break
        case 'image-caption':
          await handleImageCaption()
          break
        case 'visual-qa':
          await handleVisualQA()
          break
        case 'image-classification':
          await handleImageClassification()
          break
        case 'object-detection':
          await handleObjectDetection()
          break
        case 'image-segmentation':
          await handleImageSegmentation()
          break
        case 'text-to-speech':
          await handleTextToSpeech()
          break
        case 'speech-to-text':
          await handleSpeechToText()
          break
        case 'translation':
          await handleTranslation()
          break
        case 'summarization':
          await handleSummarization()
          break
        default:
          await handleChatSubmit()
      }
    } catch (error) {
      console.error('Error:', error)
      addMessage('Desculpe, ocorreu um erro. Tente novamente.', true)
    } finally {
      setIsLoading(false)
      // Reset file/audio after processing
      setUploadedFile(null)
      setAudioBlob(null)
    }
  }

  const handleChatSubmit = async () => {
    const userMessage = input
    setInput('')
    addMessage(userMessage, true)

    // Add a placeholder for the AI response
    const aiMessageId = Date.now() + 1
    setMessages(prev => [...prev, { 
      id: aiMessageId, 
      text: '', 
      isUser: false, 
      isTyping: true 
    }])

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Generate response using Hugging Face
    const aiResponse = await generateText(
      'google/flan-t5-large', 
      `Você é um assistente de IA útil. Responda naturalmente a: ${userMessage}`
    )

    // Update the message with the actual response
    setMessages(prev => 
      prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, text: aiResponse, isTyping: false } 
          : msg
      )
    )
  }

  const handleImageCaption = async () => {
    if (!uploadedFile) return
    
    addMessage(`[Imagem enviada: ${uploadedFile.name}]`, true, 'image')
    
    // Add a placeholder for the AI response
    const aiMessageId = Date.now() + 1
    setMessages(prev => [...prev, { 
      id: aiMessageId, 
      text: '', 
      isUser: false, 
      isTyping: true 
    }])

    // Generate image caption
    const caption = await imageToText(
      'Salesforce/blip-image-captioning-base',
      uploadedFile
    )

    // Update the message with the actual response
    setMessages(prev => 
      prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, text: `Legenda gerada: ${caption}`, isTyping: false } 
          : msg
      )
    )
  }

  const handleVisualQA = async () => {
    if (!uploadedFile) return
    
    addMessage(`[Imagem enviada: ${uploadedFile.name}] Pergunta: ${input}`, true, 'image')
    setInput('') // Clear input after using it for the question
    
    // Add a placeholder for the AI response
    const aiMessageId = Date.now() + 1
    setMessages(prev => [...prev, { 
      id: aiMessageId, 
      text: '', 
      isUser: false, 
      isTyping: true 
    }])

    // Answer visual question
    const answer = await visualQuestionAnswering(
      'dandelin/vilt-b32-finetuned-vqa',
      uploadedFile,
      input
    )

    // Update the message with the actual response
    setMessages(prev => 
      prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, text: `Resposta: ${answer}`, isTyping: false } 
          : msg
      )
    )
  }

  const handleImageClassification = async () => {
    if (!uploadedFile) return
    
    addMessage(`[Imagem enviada: ${uploadedFile.name}]`, true, 'image')
    
    // Add a placeholder for the AI response
    const aiMessageId = Date.now() + 1
    setMessages(prev => [...prev, { 
      id: aiMessageId, 
      text: '', 
      isUser: false, 
      isTyping: true 
    }])

    // Classify image
    const predictions = await imageClassification(
      'google/vit-base-patch16-224',
      uploadedFile
    )

    // Format predictions for display
    const formatted = predictions.slice(0, 3).map(p => 
      `${p.label}: ${(p.score * 100).toFixed(1)}%`
    ).join('\n')

    // Update the message with the actual response
    setMessages(prev => 
      prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, text: `Classificação:\n${formatted}`, isTyping: false } 
          : msg
      )
    )
  }

  const handleObjectDetection = async () => {
    if (!uploadedFile) return
    
    addMessage(`[Imagem enviada: ${uploadedFile.name}]`, true, 'image')
    
    // Add a placeholder for the AI response
    const aiMessageId = Date.now() + 1
    setMessages(prev => [...prev, { 
      id: aiMessageId, 
      text: '', 
      isUser: false, 
      isTyping: true 
    }])

    // Detect objects
    const detections = await objectDetection(
      'facebook/detr-resnet-50',
      uploadedFile
    )

    // Format detections for display
    const formatted = detections.slice(0, 3).map(d => 
      `${d.label}: ${(d.score * 100).toFixed(1)}%`
    ).join('\n')

    // Update the message with the actual response
    setMessages(prev => 
      prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, text: `Objetos detectados:\n${formatted}`, isTyping: false } 
          : msg
      )
    )
  }

  const handleImageSegmentation = async () => {
    if (!uploadedFile) return
    
    addMessage(`[Imagem enviada: ${uploadedFile.name}]`, true, 'image')
    
    // Add a placeholder for the AI response
    const aiMessageId = Date.now() + 1
    setMessages(prev => [...prev, { 
      id: aiMessageId, 
      text: '', 
      isUser: false, 
      isTyping: true 
    }])

    // Perform segmentation
    const segmentation = await imageSegmentation(
      'facebook/detr-resnet-50-panoptic',
      uploadedFile
    )

    // Update the message with the actual response
    setMessages(prev => 
      prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, text: `Segmentação concluída. Resultado processado com sucesso.`, isTyping: false } 
          : msg
      )
    )
  }

  const handleTextToSpeech = async () => {
    if (!input.trim()) return
    
    const userMessage = input
    setInput('')
    addMessage(userMessage, true)

    // Add a placeholder for the AI response
    const aiMessageId = Date.now() + 1
    setMessages(prev => [...prev, { 
      id: aiMessageId, 
      text: '', 
      isUser: false, 
      isTyping: true 
    }])

    // Convert text to speech
    const audioBlob = await textToSpeech(
      'facebook/fasttext-language-identification',
      userMessage
    )

    // Create audio URL for playback
    const audioUrl = URL.createObjectURL(audioBlob)
    
    // Update the message with the actual response
    setMessages(prev => 
      prev.map(msg => 
        msg.id === aiMessageId 
          ? { 
              ...msg, 
              text: `[Áudio gerado - clique para reproduzir]`,
              isTyping: false,
              audioUrl
            } 
          : msg
      )
    )
  }

  const handleSpeechToText = async () => {
    if (!audioBlob) return
    
    addMessage(`[Áudio enviado]`, true, 'audio')
    
    // Add a placeholder for the AI response
    const aiMessageId = Date.now() + 1
    setMessages(prev => [...prev, { 
      id: aiMessageId, 
      text: '', 
      isUser: false, 
      isTyping: true 
    }])

    // Transcribe speech to text
    const transcription = await automaticSpeechRecognition(
      'facebook/wav2vec2-base-960h',
      audioBlob
    )

    // Update the message with the actual response
    setMessages(prev => 
      prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, text: `Transcrição: ${transcription}`, isTyping: false } 
          : msg
      )
    )
  }

  const handleTranslation = async () => {
    if (!input.trim()) return
    
    const userMessage = input
    setInput('')
    addMessage(userMessage, true)

    // Add a placeholder for the AI response
    const aiMessageId = Date.now() + 1
    setMessages(prev => [...prev, { 
      id: aiMessageId, 
      text: '', 
      isUser: false, 
      isTyping: true 
    }])

    // Translate text (English to Portuguese as example)
    const translated = await translateText(
      'Helsinki-NLP/opus-mt-en-rom',
      userMessage,
      'en',
      'pt'
    )

    // Update the message with the actual response
    setMessages(prev => 
      prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, text: `Tradução (EN→PT): ${translated}`, isTyping: false } 
          : msg
      )
    )
  }

  const handleSummarization = async () => {
    if (!input.trim()) return
    
    const userMessage = input
    setInput('')
    addMessage(userMessage, true)

    // Add a placeholder for the AI response
    const aiMessageId = Date.now() + 1
    setMessages(prev => [...prev, { 
      id: aiMessageId, 
      text: '', 
      isUser: false, 
      isTyping: true 
    }])

    // Summarize text
    const summary = await summarizeText(
      'facebook/bart-large-cnn',
      userMessage
    )

    // Update the message with the actual response
    setMessages(prev => 
      prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, text: `Resumo: ${summary}`, isTyping: false } 
          : msg
      )
    )
  }

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <div className="logo-dot"></div>
          <span>Spancial</span>
        </div>
        <button className="theme-toggle" aria-label="Toggle theme">
          🌓
        </button>
      </header>

      <div className="tabs">
        <button 
          className={`${activeTab === 'chat' ? 'active' : ''}`} 
          onClick={() => setActiveTab('chat')}
        >
          💬 Chat
        </button>
        <button 
          className={`${activeTab === 'image-caption' ? 'active' : ''}`} 
          onClick={() => setActiveTab('image-caption')}
        >
          🖼️ Legenda de Imagem
        </button>
        <button 
          className={`${activeTab === 'visual-qa' ? 'active' : ''}`} 
          onClick={() => setActiveTab('visual-qa')}
        >
          ❓ VQA
        </button>
        <button 
          className={`${activeTab === 'image-classification' ? 'active' : ''}`} 
          onClick={() => setActiveTab('image-classification')}
        >
          🏷️ Classificação
        </button>
        <button 
          className={`${activeTab === 'object-detection' ? 'active' : ''}`} 
          onClick={() => setActiveTab('object-detection')}
        >
          🔍 Detecção
        </button>
        <button 
          className={`${activeTab === 'image-segmentation' ? 'active' : ''}`} 
          onClick={() => setActiveTab('image-segmentation')}
        >
          🧩 Segmentação
        </button>
        <button 
          className={`${activeTab === 'text-to-speech' ? 'active' : ''}`} 
          onClick={() => setActiveTab('text-to-speech')}
        >
          🔊 Texto→Áudio
        </button>
        <button 
          className={`${activeTab === 'speech-to-text' ? 'active' : ''}`} 
          onClick={() => setActiveTab('speech-to-text')}
        >
          🎤 Áudio→Texto
        </button>
        <button 
          className={`${activeTab === 'translation' ? 'active' : ''}`} 
          onClick={() => setActiveTab('translation')}
        >
          🌐 Tradução
        </button>
        <button 
          className={`${activeTab === 'summarization' ? 'active' : ''}`} 
          onClick={() => setActiveTab('summarization')}
        >
          📝 Resumo
        </button>
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.map(message => {
            // Determine message type for styling
            const isImageMessage = message.type === 'image' || 
                                  (message.text && message.text.includes('[Imagem enviada'));
            const isAudioMessage = message.type === 'audio' || 
                                  (message.text && message.text.includes('[Áudio enviado'));
            
            return (
              <div key={message.id} className={`message ${message.isUser ? 'user' : ''}`}>
                {!message.isUser && (
                  <div className="message-avatar">
                    🤖
                  </div>
                )}
                <div className="message-content">
                  {message.isTyping ? (
                    <div className="loading-indicator">
                      <span>pensando</span>
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  ) : (
                    <>
                      {message.audioUrl && (
                        <audio 
                          controls 
                          style={{ marginBottom: '0.5rem' }}
                          src={message.audioUrl}
                        >
                          Seu navegador não suporta o elemento de áudio.
                        </audio>
                      )}
                      <p>{message.text}</p>
                      {message.isUser && (
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          👍
                        </motion.span>
                      )}
                    </>
                  )}
                </div>
                {message.isUser && (
                  <div className="message-avatar">
                    {isImageMessage && 'IMG'}
                    {isAudioMessage && 'AUD'}
                    {!isImageMessage && !isAudioMessage && 'USR'}
                  </div>
                )}
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="input-area">
          {activeTab === 'chat' && (
            <input
              className="input-field"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              disabled={isLoading}
            />
          )}
          
          {['image-caption', 'visual-qa', 'image-classification', 'object-detection', 'image-segmentation'].includes(activeTab) && (
            <>
              <input
                className="input-field"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setUploadedFile(e.target.files[0])
                  }
                }}
                disabled={isLoading}
              />
              {activeTab === 'visual-qa' && (
                <input
                  className="input-field"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Faça uma pergunta sobre a imagem..."
                  disabled={isLoading}
                />
              )}
            </>
          )}
          
          {activeTab === 'text-to-speech' && (
            <input
              className="input-field"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite o texto para converter em áudio..."
              disabled={isLoading}
            />
          )}
          
          {activeTab === 'speech-to-text' && (
            <>
              <input
                className="input-field"
                type="file"
                accept="audio/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setAudioBlob(e.target.files[0])
                  }
                }}
                disabled={isLoading}
              />
            </>
          )}
          
          {['translation', 'summarization'].includes(activeTab) && (
            <input
              className="input-field"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={activeTab === 'translation' 
                ? 'Digite o texto para traduzir (Inglês → Português)' 
                : 'Digite o texto para resumir'}
              disabled={isLoading}
            />
          )}
          
          <button
            className="send-button"
            type="submit"
            disabled={isLoading || 
              (activeTab === 'chat' && !input.trim()) ||
              (['image-caption', 'visual-qa', 'image-classification', 'object-detection', 'image-segmentation'].includes(activeTab) && !uploadedFile) ||
              (activeTab === 'text-to-speech' && !input.trim()) ||
              (activeTab === 'speech-to-text' && !audioBlob) ||
              (['translation', 'summarization'].includes(activeTab) && !input.trim())
            }
            aria-label="Enviar"
          >
            {isLoading ? '⏳' : '➤'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App