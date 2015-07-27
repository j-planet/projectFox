Rails.application.routes.draw do
  root 'react#home'
  resources :users
  resources :items
end
