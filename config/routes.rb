Rails.application.routes.draw do
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
