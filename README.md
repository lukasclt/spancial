# Spancial

Uma plataforma de IA multimodal inspirada no ChatGPT, construída com React, Vite, Supabase e Hugging Face.

## ✨ Funcionalidades

- **Chat de Texto** - Conversa com modelos de linguagem como o flan-t5-large
- **Legenda de Imagem** - Gere descrições automáticas para imagens (Image-to-Text)
- **Visual Question Answering (VQA)** - Faça perguntas sobre imagens e obtenha respostas
- **Classificação de Imagem** - Identifique objetos e cenas em imagens
- **Detecção de Objetos** - Localize e identifique múltiplos objetos em imagens
- **Segmentação de Imagem** - Divida imagens em segmentos significativos
- **Texto para Áudio** - Converta texto em fala natural (TTS)
- **Áudio para Texto** - Transcreva fala em texto escrito (ASR)
- **Tradução** - Traduza texto entre idiomas
- **Resumo de Texto** - Gere resumos concisos de textos longos
- **Animações Fluidas** - Interface com transições suaves usando Framer Motion
- **Tema Claro/Escuro** - Alternar entre temas branco e preto com acentos azuis
- **Design Inspirado no ChatGPT** - Interface limpa e familiar

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 19 + Vite
- **Estilização**: CSS moderno com variáveis CSS
- **Animações**: Framer Motion
- **Backend**: Supabase (banco de dados e autenticação)
- **IA**: Hugging Face Inference API (acesso a centenas de modelos)
- **Deploy**: Vercel (configurado)

## 📋 Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com)
- Conta no [Hugging Face](https://huggingface.co) com access token

## ⚙️ Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/se usuario/spancial.git
   cd spancial
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto:
   ```env
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_anon_key_do_supabase
   VITE_HF_API_KEY=sua_chave_do_huggingface
   ```

4. Obtenha suas chaves:
   - **Supabase**: Acesse [supabase.com](https://supabase.com) → Seu projeto → Settings → API
   - **Hugging Face**: Acesse [huggingface.co](https://huggingface.co) → Settings → Access Tokens → New token

5. Execute o projeto:
   ```bash
   npm run dev
   ```

## 🧪 Testando as Funcionalidades

### Chat de Texto
1. Selecione a aba "💬 Chat"
2. Digite sua mensagem e pressione Enter ou clique no botão de envio
3. Aguarde a resposta gerada pela IA

### Legenda de Imagem
1. Selecione a aba "🖼️ Legenda de Imagem"
2. Clique no campo de upload e selecione uma imagem
3. Aguarde a legenda gerada automaticamente

### Visual Question Answering
1. Selecione a aba "❓ VQA"
2. Faça upload de uma imagem
3. Digite sua pergunta sobre a imagem no campo de texto
4. Envie e aguarde a resposta

### Outras Funcionalidades
Cada aba tem instruções específicas na interface. Basta fazer o upload do tipo de mídia apropriado (imagem, áudio, texto) e seguir as instruções na tela.

## 🤖 Modelos Utilizados (padrões)

- **Text Generation**: `google/flan-t5-large`
- **Image-to-Text**: `Salesforce/blip-image-captioning-base`
- **Visual Question Answering**: `dandelin/vilt-b32-finetuned-vqa`
- **Image Classification**: `google/vit-base-patch16-224`
- **Object Detection**: `facebook/detr-resnet-50`
- **Image Segmentation**: `facebook/detr-resnet-50-panoptic`
- **Text-to-Speech**: `facebook/fasttext-language-identification`
- **Automatic Speech Recognition**: `facebook/wav2vec2-base-960h`
- **Translation**: `Helsinki-NLP/opus-mt-en-rom` (EN → PT)
- **Summarization**: `facebook/bart-large-cnn`

## 🔧 Personalizando Modelos

Para alterar qualquer modelo, edite o arquivo `src/App.jsx` e procure pelas chamadas de função correspondentes. Por exemplo, para mudar o modelo de legenda de imagem:

```javascript
// Antes
const caption = await imageToText(
  'Salesforce/blip-image-captioning-base',
  uploadedFile
);

// Depois (usando outro modelo)
const caption = await imageToText(
  'nlpconnect/vit-gpt2-image-captioning',
  uploadedFile
);
```

## 🌐 Deploy no Vercel

1. Faça push do código para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Configure as variáveis de ambiente nas configurações do projeto:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_HF_API_KEY`
4. O Vercel irá detectar o `vercel.json` e fazer o build automaticamente

## 📝 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- [Hugging Face](https://huggingface.co) por fornecer acesso gratuito a modelos de IA de ponta
- [Supabase](https://supabase.com) por oferecer um backend open-source poderoso
- [Vercel](https://vercel.com) por facilitar o deploy de aplicações frontend
- [Framer Motion](https://www.framer.com/motion/) pelas belas animações
- A comunidade open-source por tornar tudo isso possível

---

**Spancial** - Sua plataforma pessoal de IA multimodal. Explore, crie e inove com o poder da inteligência artificial. 🚀