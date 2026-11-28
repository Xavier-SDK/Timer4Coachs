# Timer4Coachs, pages web

Pages publiées par GitHub Pages sur `timer4coachs.github.io` :

- `tv/` : l'écran web. Une TV, un ordinateur ou une tablette affiche le chrono de l'iPhone avec son code. L'adresse est inscrite dans l'app : ne pas la déplacer.
- `index.html` et `sw.js` : page d'information de l'ancienne app web ; `sw.js` la désinstalle des téléphones où elle l'était encore.

Le code de l'app iPhone et Apple Watch est dans un dépôt privé.
- `oauth/` : page de connexion d'une IA (OAuth). L'IA y envoie le coach, qui accepte dans l'app de son iPhone.

## Connecter une IA

Toutes les IA qui acceptent un connecteur MCP (Claude, ChatGPT, Le Chat, Grok, Perplexity…) : ajouter un connecteur personnalisé « Timer4Coachs » à l'adresse `https://uyykwnzvwwaerzpgsqsp.supabase.co/functions/v1/mcp`. Au premier usage, l'IA ouvre la page `oauth/` : accepter dans l'app Timer4Coachs, une seule fois.
