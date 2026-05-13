# Spancial - Guia de Configuração

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
VITE_SUPABASE_URL=sua_url_do_supabase_aqui
VITE_SUPABASE_ANON_KEY=sua_anon_key_do_supabase_aqui
VITE_HF_API_KEY=sua_chave_do_huggingface_aqui
```

## Como obter suas chaves:

### Supabase:
1. Acesse [supabase.com](https://supabase.com)
2. Crie um projeto
3. Vá em Settings > API
4. Copie a URL e a chave anon pública

### Hugging Face:
1. Acesse [huggingface.co](https://huggingface.co)
2. Faça login ou crie uma conta
3. Vá em Settings > Access Tokens
4. Crie um novo token com permissão de leitura
5. Copie o token

## Modelo de IA Padrão

O projeto está configurado para usar o modelo: **google/flan-t5-large**

Este é um modelo versátil que:
- Suporta múltiplos idiomas (incluindo português)
- É gratuito para uso na API do Hugging Face
- Tem bom equilíbrio entre qualidade e velocidade
- Não requer approval especial

## Para mudar o modelo:

Edite o arquivo `src/App.jsx` e altere esta linha:
```javascript
const aiResponse = await generateText(
  'google/flan-t5-large',  // <-- Altere este ID do modelo
  `Você é um assistente de IA útil. Responda naturalmente a: ${userMessage}`
)
```

Modelos alternativos recomendados:
- `facebook/opt-iml-1.3b` (bom para português)
- `bigscience/bloomz-560m` (multilíngue)
- `mistralai/Mistral-7B-Instruct-v0.2` (alta qualidade, pode requerer approval)
- `meta-llama/Llama-2-7b-chat-hf` (requer approval no Hugging Face)

## Para executar localmente:

```bash
npm install
npm run dev
```

## Para deploy no Vercel:

1. Faça push do código para um repositório GitHub
2. Importe o projeto no Vercel
3. Configure as variáveis de ambiente nas configurações do projeto
4. Deploy automático!

## Observações importantes:

- O modelo padrão (flan-t5-large) tem limites de taxa na API gratuita do Hugging Face
- Para uso intenso, considere adquirir um plano pago no Hugging Face
- Alguns modelos maiores podem ter custos associados ou requerer approval especial
- Nunca compartilhe suas chaves de API públicamente