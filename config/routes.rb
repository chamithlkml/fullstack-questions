Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  get "up" => "rails/health#show", as: :rails_health_check

  get 'blog', to: 'home#blog'

  namespace :api do
    namespace :v1 do
      resources :questions, only: [:index, :create] do
        member do
          put 'update_counter'
        end
      end

      resources :tags, only: [:index]
    end
  end
end
