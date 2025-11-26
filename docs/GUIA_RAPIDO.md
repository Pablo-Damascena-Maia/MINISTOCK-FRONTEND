# Guia Rápido - Telas de Estoque MINISTOCK

## 🚀 Arquivos Criados/Modificados

### ✅ Novos Arquivos
1. `app/estoque/_layout.jsx` - Layout de navegação
2. `app/estoque/bebidas.jsx` - Tela de bebidas
3. `app/estoque/pereciveis.jsx` - Tela de perecíveis
4. `app/estoque/nao-pereciveis.jsx` - Tela de não perecíveis
5. `services/categoriaService.js` - Serviço de categorias

### 🔧 Arquivos Modificados
1. `app/(tabs)/estoque.jsx` - Tela principal com navegação
2. `services/produtoService.js` - Endpoints corrigidos

---

## 📱 Como Usar

### 1. Instalar Dependências (se necessário)
```bash
cd MINISTOCK-FRONTEND
npm install
```

### 2. Iniciar o Aplicativo
```bash
npm start
# ou
expo start
```

### 3. Navegar no App
1. Faça login no aplicativo
2. Vá para a aba **"Estoque"**
3. Escolha uma categoria:
   - 🍺 **Bebidas** (azul)
   - 🥗 **Perecíveis** (verde)
   - 📦 **Não Perecíveis** (amarelo)

---

## 🎯 Funcionalidades Disponíveis

### Em Cada Tela de Categoria:

#### ➕ Adicionar Produto
1. Clique no botão **"Adicionar [Categoria]"**
2. Preencha o formulário:
   - **Nome** (obrigatório)
   - Descrição
   - Quantidade
   - Código de Barras
   - URL da Imagem
3. Clique em **"Salvar"**

#### ✏️ Editar Produto
1. Clique no ícone de **lápis** (amarelo) no card do produto
2. Modifique os campos desejados
3. Clique em **"Salvar"**

#### 🗑️ Excluir Produto
1. Clique no ícone de **lixeira** (vermelho) no card do produto
2. Confirme a exclusão

#### 👁️ Visualizar Produtos
- A lista mostra todos os produtos da categoria
- Cada card exibe:
  - Nome do produto
  - Descrição
  - Quantidade em estoque
  - Código de barras (se houver)

---

## ⚙️ Configuração Importante

### IDs de Categoria no Backend

Os IDs usados nas telas são:
- **Bebidas**: `categoria_produtoId: 1`
- **Perecíveis**: `categoria_produtoId: 2`
- **Não Perecíveis**: `categoria_produtoId: 3`

**⚠️ IMPORTANTE:** Se os IDs no seu banco de dados forem diferentes, você precisa ajustar nos arquivos:
- `app/estoque/bebidas.jsx` (linha ~75)
- `app/estoque/pereciveis.jsx` (linha ~75)
- `app/estoque/nao-pereciveis.jsx` (linha ~75)

Procure por:
```javascript
categoria_produtoId: 1, // Ajustar conforme seu backend
```

---

## 🔗 Endpoints Utilizados

### Produtos
- `GET /api/produto/listar` - Listar todos
- `GET /api/produto/listarPorId/{id}` - Buscar por ID
- `POST /api/produto/criar` - Criar novo
- `PUT /api/produto/atualizar/{id}` - Atualizar
- `PATCH /api/produto/atualizarStatus/{id}` - Atualizar status
- `DELETE /api/produto/apagar/{id}` - Excluir

### Categorias
- `GET /api/categoriaProduto/listar` - Listar todas
- `GET /api/categoriaProduto/listarPorId/{id}` - Buscar por ID
- `POST /api/categoriaProduto/criar` - Criar nova
- `PUT /api/categoriaProduto/atualizar/{id}` - Atualizar
- `PATCH /api/categoriaProduto/atualizarStatus/{id}` - Atualizar status
- `DELETE /api/categoriaProduto/apagar/{id}` - Excluir

---

## 🎨 Personalização

### Alterar Cores
Edite os `styles` em cada arquivo:
- **Bebidas**: `#0077cc` (azul)
- **Perecíveis**: `#28a745` (verde)
- **Não Perecíveis**: `#ffc107` (amarelo)

### Alterar Ícones
Os ícones usam a biblioteca **Ionicons**:
- Bebidas: `beer`
- Perecíveis: `nutrition`
- Não Perecíveis: `cube`

Veja mais ícones em: https://ionic.io/ionicons

---

## 🐛 Solução de Problemas

### Erro: "Cannot find module 'expo-router'"
```bash
npm install expo-router
```

### Erro: "Cannot find module 'react-native-vector-icons'"
```bash
npm install react-native-vector-icons
```

### Erro de Navegação
Certifique-se de que o `expo-router` está configurado corretamente no `app.json` e `package.json`.

### Erro de API (401 Unauthorized)
Verifique se:
1. O backend está rodando
2. Você está logado no app
3. O token JWT está sendo enviado corretamente

### Produtos não aparecem na categoria correta
Verifique se o campo `categoria` ou `categoriaProduto` no backend está retornando o valor correto. A lógica de separação está em `app/context/EstoqueContext.jsx` (linhas 58-60).

---

## 📝 Notas Adicionais

### Context API
O `EstoqueContext` gerencia o estado global dos produtos. Ele:
- Carrega produtos do backend
- Separa por categoria automaticamente
- Mantém sincronização com o servidor

### Autenticação
Todas as requisições incluem automaticamente o token JWT através do interceptor em `services/api.js`.

### Offline
Atualmente, o app requer conexão com o backend. Para funcionalidade offline, seria necessário implementar cache local.

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs do console
2. Confira se o backend está respondendo corretamente
3. Valide os IDs de categoria no banco de dados
4. Revise a documentação completa em `MINISTOCK_IMPLEMENTACAO.md`

---

## ✅ Checklist de Verificação

- [ ] Backend está rodando
- [ ] Frontend está rodando
- [ ] Login funciona
- [ ] Aba "Estoque" é acessível
- [ ] Navegação para categorias funciona
- [ ] Listagem de produtos funciona
- [ ] Adicionar produto funciona
- [ ] Editar produto funciona
- [ ] Excluir produto funciona
- [ ] IDs de categoria estão corretos

---

**Implementação concluída com sucesso! 🎉**
