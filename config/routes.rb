Rails.application.routes.draw do
  resources :shares, only: [:index]
end
