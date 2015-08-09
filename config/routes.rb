Rails.application.routes.draw do
  root to: "static_pages#root"
  get "/landing", to: "static_pages#landing", as: "landing"

  namespace :api, defaults: { formate: :json } do
    resources :users, only: [:create, :destroy, :index, :show, :update]
    resources :songs, only: [:create, :destroy, :index, :show, :update]
  end
end
