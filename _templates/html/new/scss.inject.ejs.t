---
inject: true
to: src/assets/scss/global.scss
after: \/\* inject\:imports \*\/
---
@import '../../<%= category %>/styles/<%= h.changeCase.paramCase(name) %>';