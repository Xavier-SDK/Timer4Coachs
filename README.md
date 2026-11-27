# Timer4Coachs, pages web

Pages publiées par GitHub Pages sur `timer4coachs.github.io` :

- `tv/` : l'écran web. Une TV, un ordinateur ou une tablette affiche le chrono de l'iPhone avec son code. L'adresse est inscrite dans l'app : ne pas la déplacer.
- `index.html` et `sw.js` : page d'information de l'ancienne app web ; `sw.js` la désinstalle des téléphones où elle l'était encore.

Le code de l'app iPhone et Apple Watch est dans un dépôt privé.
- `oauth/` : page de connexion d'une IA (OAuth). L'IA y envoie le coach, qui accepte dans l'app de son iPhone.
- `plugin/` et `.claude-plugin/marketplace.json` : plugin Claude « timer4coachs » (skill d'écriture de séance et connecteur), construit par `plugin-claude/publier.py` du dépôt de l'app : ne pas le modifier ici.

## Plugin Claude

Claude Code ou Claude pour ordinateur :

```
/plugin install timer4coachs --marketplace timer4coachs/timer4coachs.github.io
```

Claude sur le web : téléverser `https://timer4coachs.github.io/plugin/timer4coachs.zip` dans Personnaliser > Plugins.
Au premier envoi de séance, Claude ouvre la page de connexion : accepter dans l'app Timer4Coachs, une seule fois.
