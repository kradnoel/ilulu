

class Language {
  static userPasswordIncorrect = 'USER_PASSWORD_INCORRECT'
  static userNotFound = 'USER_NOT_FOUND'
  static userAlreadyRegisted = 'USER_ALREADY_REGISTED'

  static tokenInvalid = 'AUTH_TOKEN_INVALID'
  static tokenMissing = 'AUTH_TOKEN_MISSING'

  // Accounts
  static ACCOUNT_ADD_SUCCESS = 'Conta registrada com sucesso'
  static ACCOUNT_MODIFY_SUCCESS = 'Conta modificada com sucesso'
  static ACCOUNT_REMOVE_SUCCESS = 'Conta removida com sucesso'

  static ACCOUNT_EXISTS_ERROR = 'Conta ja registrada no sistema'
  static ACCOUNT_NOT_ACTIVE_ERROR = `Conta desactivada. Contacte os Operadores do sistema
   para mais Informacoes`
  static ACCOUNT_ADD_PERMISSION_ERROR = 'Utilizador sem permissoes para criar contas'
  static ACCOUNT_MODIFY_PERMISSION_ERROR = 'Utilizador sem permissoes para modificar contas'
  static ACCOUNT_REMOVE_PERMISSION_ERROR = 'Utilizador sem permissoes para remover contas'
  static ACCOUNT_NOT_FOUND_ERROR = 'Conta nao existe no sistema'
  static ACCOUNT_USER_PASSWORD_ERROR = 'Nome de Utilizador ou senha incorrecta'

  // Equipaments

  // Operators

  // Residents

  // Visitors

}

module.exports = Language
