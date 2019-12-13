Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]

  resources :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"

  resources :episodes

  root to: 'pages#index'
  match '*path', to: 'pages#index', via: :all
end
