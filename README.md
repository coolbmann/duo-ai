
https://github.com/user-attachments/assets/9a14d204-6627-4714-92f1-06b418e27e66

# Duo AI
Multi-agent platform for bespoke pickleball utilities to unify and access external API integrations.

## 📄 Overview 
Multi-agent platform for bespoke pickleball utilities to unify and access external API integrations.

This is a passion project striving to bring convenience to practical, pickleball-related frustrations.

The initial core of the platform is to solve the **fragmented nature** of court-booking experience - caused by the vast booking ecosystem available to individual clubs - as well as the lack of available UX to analyse DUPR matchplay sessions.

I wanted to abstract away the complexity of those processes by building a **multi-agent platform** that users can interact with via chat, for specific utilities.

Currently all data integrations are unique - done by **reverse-engineering publicly available APIs** across different systems, and using **human-in-the-loop checkpoints** to verify decisions and **narrow LLM contexts**.

For any other pickle-heads, I would love to hear any suggestions on useful agents to build!

## 💡 Technologies Used 

**React** and **Node.js (TypeScript)** power the front and back-end respectively, backed by a **Supabase (PostgreSQL)** database.

Socket.io maintains persistent **WebSocket connections** to support the async, streaming nature of AI agent responses.

We use the **LangChain** framework for model access, as well as **LangGraph** for agent task orchestration.

Unlike past projects, given the real-time nature our data sources, we rely on calling external APIs and HIL checkpoints to narrow context instead of semantic retrieval via Pinecone data sources.

## 🔥 Features 
- Natural language court search - ask for courts by location, date, or time and the agent handles the rest.
- Multi-step LangGraph agent pipeline: intent classification → agent-selection → data-fetch -> actionable output
- Per-thread conversation memory, so follow-up questions retain context from earlier in the conversation.

## ⚠️ Important Note
The platform does not support auth, meaning all users share a public account. Past conversations will be publicly available once session history feature is in production.

## ⚡ See it in Action!

View the live app at [duo-ai.bryanherijanto.com](duo-ai.bryanherijanto.com).
