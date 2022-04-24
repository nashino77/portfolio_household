Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]
      # devise_for :users
      
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
