# 🧩 Mini Memory

Juego de memoria (Memory Game) construido con **Nuxt 4 + Vue 3 + TailwindCSS v4**.

Es el **prototipo base** del curso *"Construye tu primera web con piezas de Lego"*. Sirve para mostrar a los alumnos un proyecto terminado que luego personalizan y extienden sesión a sesión.

---

## 🚀 Cómo arrancarlo

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) y empieza a jugar.

---

## 🎮 Cómo se juega

1. Elige un tema (animales, frutas, emojis, símbolos).
2. Haz click en dos cartas para voltearlas.
3. Si son iguales → ¡par encontrado! 🎉
4. Si no → se voltean de nuevo tras 1 segundo.
5. Encuentra todos los pares antes de que te aburras.

---

## 🧱 Arquitectura por piezas

El proyecto está dividido en **piezas de Lego**. Cada una hace una sola cosa:

```
mini-memory/
├── app/                              ← 📁 srcDir de Nuxt 4 (código de cliente)
│   ├── app.vue                       ← Layout raíz (envuelve NuxtPage)
│   ├── pages/
│   │   └── index.vue                 ← 🎮 Orquesta todas las piezas
│   ├── components/
│   │   ├── GameCard.vue              ← 🧩 Pieza 1: la carta individual
│   │   ├── Board.vue                 ← 🧩 Pieza 2: el tablero 4×3
│   │   ├── ScoreBoard.vue            ← 🧩 Pieza 3: marcador + estado
│   │   ├── Timer.vue                 ← 🧩 Pieza 4: cronómetro mm:ss
│   │   └── ResultsModal.vue          ← 🧩 Pieza 5: modal de victoria
│   ├── composables/
│   │   └── useMemoryGame.ts          ← ⚙️ Lógica del juego (estado, match, victoria)
│   ├── utils/
│   │   └── confetti.ts               ← 🎊 Lanzador de confetti
│   └── assets/
│       ├── css/tailwind.css          ← 🎨 Estilos base + componentes + tema (Tailwind v4)
│       └── data/cards.json           ← 🃏 4 temáticas de cartas
├── nuxt.config.ts
└── tsconfig.json
```

### Flujo de datos

```
cards.json (datos)
   ↓
useMemoryGame(pares) ← composable con el estado
   ↓
pages/index.vue ← orquesta, conecta piezas
   ↓ (props + emits)
Board ─→ GameCard (v-for renderiza 12 cartas)
ScoreBoard ← (moves, matches, isWin)
Timer → (segundos al padre)
ResultsModal ← (modal al ganar)
```

---

## 📚 Conceptos que enseña (alto nivel)

| Concepto | Dónde se ve | Cómo se explica |
|---|---|---|
| **Componente** | `GameCard`, `Board`, etc. | "Una pieza de Lego con forma y función" |
| **Props** | `:value`, `:visible`, `:matched` en `GameCard` | "Las instrucciones que pasas a la pieza" |
| **Emits** | `@select-card` en `GameCard`, `@flip-card` en `Board` | "El botón que avisa al padre" |
| **Estado reactivo (`ref`)** | `useMemoryGame` | "La memoria que cambia" |
| **`computed`** | `matchesFound`, `isWin` | "Valores calculados automáticamente" |
| **`watch`** | `watch(selection)` y `watch(isWin)` | "Vigila cuando algo cambia y reacciona" |
| **`v-for`** | Render del grid en `Board` | "Repetir piezas N veces" |
| **`v-if`/`v-else`** | Mostrar/ocultar contenido | "Mostrar según condición" |
| **Tailwind** | Todas las clases | "Piezas de estilo que combinas" |
| **localStorage** | `bestScore` | "Memoria que sobrevive a recargas" |

---

## 🛣️ Próximos pasos (lo que viene en el curso)

Este prototipo es **la base**. Los alumnos lo personalizarán y extenderán:

1. 🎨 Cambiar colores, tipografías, fondo.
2. 🃏 Crear sus propias temáticas (`assets/data/cards.json`).
3. ➕ Aumentar la dificultad (más cartas).
4. 🏆 Mejorar el modal de resultados con más stats.
5. 🌐 Convertirlo en Nuxt full-stack (múltiples páginas, ranking, etc.).
6. 🚀 Desplegarlo en Vercel/Netlify.

---

## 🙏 Créditos

- **Inspirado en** [peek-a-vue](https://github.com/bencodezen/peek-a-vue) de Ben Hong (Vue.js core team).
- Stack: Nuxt 4 + Vue 3 (Composition API + `<script setup>`) + TailwindCSS v4 + TypeScript + canvas-confetti.
- Metodología pedagógica: "aprender construyendo, pieza a pieza".

---

## 📄 Licencia

MIT — úsalo, modifícalo, enséñalo. 🧩
