import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import nginx from "highlight.js/lib/languages/nginx";
import yaml from "highlight.js/lib/languages/yaml";
import dockerfile from "highlight.js/lib/languages/dockerfile";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("nginx", nginx);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("dockerfile", dockerfile);

export default hljs;
