// exemplo de trecho em useEffect (substitua o bloco de inicialização do chat por este padrão)
useEffect(() => {
  const initializeChat = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      if (!apiKey) {
        throw new Error("VITE_API_KEY environment variable not set.");
      }

      // Se você usar um pacote npm (ex: @google/genai) acrescente-o nas deps e então:
      // const { GoogleGenAI } = await import('@google/genai');
      // const ai = new GoogleGenAI({ apiKey });
      // const chatSession = ai.chats.create({ model: 'gemini-2.5-flash', config: { systemInstruction } });

      // --- temporariamente: apenas setamos um placeholder se preferir ---
      // setChat({} as any); // descomente e ajuste conforme seu fluxo
    } catch (e: any) {
      console.error("Failed to initialize AI Chat:", e);
      setChatError("Não foi possível iniciar o chat. Verifique a chave da API.");
    }
  };

  initializeChat();
}, []);
