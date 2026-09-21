# Garcia Engenharia & Construção

Site institucional estático da Garcia Engenharia & Construção, publicado no GitHub Pages com domínio próprio.

## Publicação

- Domínio principal: `https://garciaconstrutora.com.br/`
- A publicação deve usar a raiz da branch configurada no GitHub Pages.
- O arquivo `CNAME` deve permanecer no repositório para preservar o domínio personalizado.
- Todos os caminhos internos são relativos para funcionarem tanto localmente quanto no GitHub Pages.

## Estrutura

- `index.html`: página institucional
- `styles.css`: estilos e responsividade
- `script.js`: menu, animações, métricas e preferências de privacidade
- `404.html`: página de erro do GitHub Pages
- `politica-de-privacidade.html`: informações de privacidade
- `robots.txt` e `sitemap.xml`: arquivos de indexação
- `assets/`: identidade visual e imagens oficiais
- `en/` e `es/`: versões estáticas em inglês e espanhol
- `build-locales.js`: gerador sem dependências das páginas localizadas

## Conteúdo multilíngue

A versão em português é a fonte principal. Depois de alterar textos ou estrutura em `index.html`, execute `node build-locales.js` e revise as páginas geradas em `en/index.html` e `es/index.html` antes de publicar.

## Validação antes de publicar

1. Abrir `index.html` e revisar desktop e mobile.
2. Confirmar telefone, endereço, serviços, avaliações e links externos com a empresa.
3. Validar `sitemap.xml`, dados estruturados e metadados sociais após a publicação.
4. Executar Lighthouse na URL pública e verificar Performance, Accessibility, Best Practices e SEO.
5. Confirmar o domínio no Google Search Console e enviar o sitemap.

## Integrações

O Google Analytics usa a propriedade `G-QWGT12FR8R` e só é carregado após consentimento. Alterações de propriedade, titularidade ou política jurídica devem ser aprovadas pela empresa.
