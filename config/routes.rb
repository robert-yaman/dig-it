Rails.application.routes.draw do
  root to: "static_pages#root"
  get "/landing", to: "static_pages#landing", as: "landing"
  resource :session, only: [:create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :destroy, :index, :show, :update]
    resources :songs, only: [:create, :destroy, :index, :show, :update]
  end
end
