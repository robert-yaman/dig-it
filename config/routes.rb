Rails.application.routes.draw do
  root to: "static_pages#root"
  get "/landing", to: "static_pages#landing", as: "landing"
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:create]

  namespace :api, defaults: { format: :json } do
    get "/users/current", to: "users#current"
    resources :users, only: [:destroy, :index, :show, :update]
    resources :songs, only: [:create, :destroy, :index, :show, :update]
  end
end
