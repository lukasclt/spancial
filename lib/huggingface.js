import { HfInference } from '@huggingface/inference'

const HF_API_KEY = import.meta.env.VITE_HF_API_KEY || ''

export const hf = new HfInference(HF_API_KEY)

/**
 * Generate text using a Hugging Face model
 * @param {string} model - Model ID
 * @param {string} prompt - Input prompt
 * @param {object} options - Additional options
 * @returns {Promise<string>} Generated text
 */
export async function generateText(model, prompt, options = {}) {
  try {
    const result = await hf.textGeneration({
      model,
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        top_p: 0.9,
        ...options
      }
    })
    return result.generated_text
  } catch (error) {
    console.error('Error generating text:', error)
    throw error
  }
}

/**
 * Get embeddings from a Hugging Face model
 * @param {string} model - Model ID
 * @param {string|string[]} inputs - Text to embed
 * @returns {Promise<number[]>} Embedding vector
 */
export async function getEmbeddings(model, inputs) {
  try {
    const result = await hf.featureExtraction({
      model,
      inputs
    })
    return result
  } catch (error) {
    console.error('Error getting embeddings:', error)
    throw error
  }
}

/**
 * Generate image caption using a Hugging Face model
 * @param {string} model - Model ID (e.g., "Salesforce/blip-image-captioning-base")
 * @param {Blob|File|string} image - Image data (Blob, File, or base64 string)
 * @returns {Promise<string>} Generated caption
 */
export async function imageToText(model, image) {
  try {
    const result = await hf.imageToText({
      model,
      data: image
    })
    return result.generated_text
  } catch (error) {
    console.error('Error generating image caption:', error)
    throw error
  }
}

/**
 * Answer questions about an image using a Hugging Face model
 * @param {string} model - Model ID (e.g., "dandelin/vilt-b32-finetuned-vqa")
 * @param {Blob|File|string} image - Image data
 * @param {string} question - Question about the image
 * @returns {Promise<string>} Answer to the question
 */
export async function visualQuestionAnswering(model, image, question) {
  try {
    const result = await hf.visualQuestionAnswering({
      model,
      data: image,
      parameters: {
        question
      }
    })
    return result.answer
  } catch (error) {
    console.error('Error in visual question answering:', error)
    throw error
  }
}

/**
 * Classify an image using a Hugging Face model
 * @param {string} model - Model ID (e.g., "google/vit-base-patch16-224")
 * @param {Blob|File|string} image - Image data
 * @returns {Promise<Array>} Array of predictions with labels and scores
 */
export async function imageClassification(model, image) {
  try {
    const result = await hf.imageClassification({
      model,
      data: image
    })
    return result
  } catch (error) {
    console.error('Error in image classification:', error)
    throw error
  }
}

/**
 * Detect objects in an image using a Hugging Face model
 * @param {string} model - Model ID (e.g., "facebook/detr-resnet-50")
 * @param {Blob|File|string} image - Image data
 * @returns {Promise<Array>} Array of detected objects with boxes and labels
 */
export async function objectDetection(model, image) {
  try {
    const result = await hf.objectDetection({
      model,
      data: image
    })
    return result
  } catch (error) {
    console.error('Error in object detection:', error)
    throw error
  }
}

/**
 * Segment an image using a Hugging Face model
 * @param {string} model - Model ID (e.g., "facebook/detr-resnet-50-panoptic")
 * @param {Blob|File|string} image - Image data
 * @returns {Promise<Object>} Segmentation result
 */
export async function imageSegmentation(model, image) {
  try {
    const result = await hf.imageSegmentation({
      model,
      data: image
    })
    return result
  } catch (error) {
    console.error('Error in image segmentation:', error)
    throw error
  }
}

/**
 * Convert text to speech using a Hugging Face model
 * @param {string} model - Model ID (e.g., "facebook/fasttext-language-identification")
 * @param {string} text - Text to convert to speech
 * @returns {Promise<Blob>} Audio blob
 */
export async function textToSpeech(model, text) {
  try {
    const result = await hf.textToSpeech({
      model,
      inputs: text
    })
    // Convert ArrayBuffer to Blob
    return new Blob([result], { type: 'audio/wav' })
  } catch (error) {
    console.error('Error in text to speech:', error)
    throw error
  }
}

/**
 * Transcribe speech to text using a Hugging Face model
 * @param {string} model - Model ID (e.g., "facebook/wav2vec2-base-960h")
 * @param {Blob|File} audio - Audio data
 * @returns {Promise<string>} Transcribed text
 */
export async function automaticSpeechRecognition(model, audio) {
  try {
    const result = await hf.automaticSpeechRecognition({
      model,
      data: audio
    })
    return result.text
  } catch (error) {
    console.error('Error in automatic speech recognition:', error)
    throw error
  }
}

/**
 * Translate text using a Hugging Face model
 * @param {string} model - Model ID (e.g., "Helsinki-NLP/opus-mt-en-rom")
 * @param {string} text - Text to translate
 * @param {string} sourceLang - Source language code (optional)
 * @param {string} targetLang - Target language code (optional)
 * @returns {Promise<string>} Translated text
 */
export async function translateText(model, text, sourceLang, targetLang) {
  try {
    const result = await hf.translation({
      model,
      inputs: text,
      parameters: {
        src_lang: sourceLang,
        tgt_lang: targetLang
      }
    })
    return result.translation_text
  } catch (error) {
    console.error('Error in translation:', error)
    throw error
  }
}

/**
 * Summarize text using a Hugging Face model
 * @param {string} model - Model ID (e.g., "facebook/bart-large-cnn")
 * @param {string} text - Text to summarize
 * @param {object} options - Additional options (max_length, min_length, etc.)
 * @returns {Promise<string>} Summarized text
 */
export async function summarizeText(model, text, options = {}) {
  try {
    const result = await hf.summarization({
      model,
      inputs: text,
      parameters: {
        max_length: 150,
        min_length: 40,
        ...options
      }
    })
    return result.summary_text
  } catch (error) {
    console.error('Error in summarization:', error)
    throw error
  }
}