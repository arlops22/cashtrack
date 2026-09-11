# Use Cases — CashTrack

## Authentication

### UC01 — Register account

- **Actor:** User
- **Main flow:**
  1. User enters e-mail and password
  2. System checks that the e-mail is not in use
  3. System saves the user
- **Alternative flow:** E-mail already registered → system displays an error and doesn't create the account

### UC02 — Log in

- **Actor:** User
- **Main flow:**
  1. User enters e-mail and password
  2. System authenticates user
- **Alternative flow:** Invalid credentials → system displays an error

## Contas Bancárias

### UC03 — Criar conta bancária

- **Ator:** User
- **Main flow:**
  1. User informa nome, valor inicial e tipo (Conta corrente, Poupança, Investimento)
  2. Sistema salva a conta bancária

### UC04 — Editar/excluir conta bancária

- **Ator:** User
- **Main flow:**
  1. User seleciona uma conta existente
  2. Edita nome/tipo, ou solicita exclusão
  3. Sistema salva as alterações ou remove a conta
- **Alternative flow:** Conta possui transações vinculadas → sistema pede confirmação explícita antes de excluir (e o que fazer com as transações associadas)

## Categorias

### UC05 — Gerenciar categorias

- **Ator:** User
- **Main flow:**
  1. User pode criar, editar ou excluir uma categoria
  2. Ao excluir uma categoria em uso, sistema reclassifica as transações vinculadas para "Sem categoria"

## Transações

### UC06 — Gerenciar transação

- **Ator:** User
- **Main flow:**
  1. User pode criar, editar ou excluir uma transação
  2. Ao criar/editar, informa: conta bancária, **tipo (receita ou despesa)**, valor, categoria e método de pagamento (Dinheiro, Pix, Cartão Débito/Crédito)
  3. Sistema salva a transação e atualiza o saldo da conta bancária correspondente

### UC07 — Listar/filtrar transações de uma conta bancária

- **Ator:** User
- **Main flow:**
  1. User aplica filtros (categoria, período, tipo, método, favoritos)
  2. Sistema exibe as transações filtradas

### UC08 — Favoritar transação

- **Ator:** User
- **Main flow:**
  1. User marca/desmarca uma transação como favorita
  2. Sistema atualiza o status da transação

## Estatísticas Financeiras

### UC09 — Visualizar totais

- **Ator:** User
- **Main flow:**
  1. Sistema soma as transações do tipo "despesa" do período selecionado → total gasto
  2. Sistema soma as transações do tipo "receita" do período selecionado → total arrecadado
  3. Sistema calcula o saldo final (arrecadado − gasto)
  4. User pode visualizar os totais de uma conta específica ou consolidados de todas as contas

### UC10 — Visualizar gastos por categoria

- **Ator:** User
- **Main flow:**
  1. Sistema agrupa as despesas do mês por categoria
  2. Sistema exibe o resultado (ex: gráfico ou lista com percentuais)

### UC11 — Comparar meses

- **Ator:** User
- **Main flow:**
  1. User seleciona um ou mais meses
  2. Sistema exibe a comparação de gastos e receitas entre os períodos selecionados

---

**Observações de escopo (V1):**

- Metas e importação por CSV ficam para a Versão 2.
- A relação entre metas e contas bancárias (entidade separada vs. reserva em conta poupança) ainda não foi definida — decisão adiada para a V2.
- Recorrência de transações (ex: salário, aluguel fixo) não está detalhada nesta lista — confirmar se entra na V1 ou se também fica para depois.
