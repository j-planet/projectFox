Rails.application.routes.draw do
  resources :transactions
  resources :ratings
  resources :user_identifications
  root 'react#home'
  resources :items

  devise_for :user, only: []

  # for facebook & twitter login
  devise_for :users, controllers: { omniauth_callbacks: 'omniauth_callbacks' },
                     skip: [:invitations, :session, :registration],
                     path: ''

  namespace :auth, defaults: { format: :json } do
    get 'login'    => 'sessions#login' 
    post 'register' => 'sessions#register'
  end

end
