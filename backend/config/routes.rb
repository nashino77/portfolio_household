Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]
      
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      
      namespace :auth do
        resources :sessions, only: %i[index]
      end
      
      resources :users do
        resources :households do
          resources :spendings
        end
      end
      
    end
  end
end
