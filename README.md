# 🏪 MINISTOCK

**MINISTOCK** é um aplicativo móvel de **gerenciamento de estoque** desenvolvido com **React Native**, utilizando o **framework Expo**.  
O objetivo do app é permitir o **controle prático e eficiente de produtos, movimentações e níveis de estoque**, ideal para pequenos e médios negócios. 📦  

## 🚀 Funcionalidades Principais

- **📦 Cadastro de Produtos:** Adicione, edite e remova produtos com informações detalhadas como nome, código, quantidade e valor unitário.  
- **🔄 Movimentações de Estoque:** Registre entradas e saídas de produtos e acompanhe o histórico completo de movimentações.  
- **🔔 Notificações Inteligentes:** Receba alertas automáticos quando o estoque de um item atingir níveis mínimos definidos.  
- **🎨 Interface Intuitiva:** Layout limpo e responsivo com uso de **StyleSheet** e **componentização** para uma experiência fluida.  

## 🛠️ Tecnologias Utilizadas

- **React Native** – Framework para desenvolvimento mobile multiplataforma  
- **Expo** – Ferramenta para facilitar build, deploy e execução do app  
- **TypeScript** – Tipagem estática e melhor manutenção de código  
- **StyleSheet** – Estilização modular e reutilizável  
- **Componentização** – Estrutura organizada e escalável de componentes funcionais  

## ⚙️ Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seuusuario/ministock.git
   ```

2. **Acesse o diretório do projeto:**
   ```bash
   cd ministock
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o projeto com Expo:**
   ```bash
   npx expo start
   ```

5. **Visualize o app:**
   - Use o aplicativo **Expo Go** no seu celular para escanear o QR Code exibido no terminal.

## 📘 Regra de Negócio

O **MINISTOCK** aplica a seguinte regra de negócio principal:  
> Toda movimentação de estoque (entrada ou saída) deve atualizar automaticamente a **quantidade total do produto**, garantindo que **não haja saídas de itens com quantidade insuficiente**.  

Essa lógica mantém a integridade dos dados e evita inconsistências no controle de estoque.  
,