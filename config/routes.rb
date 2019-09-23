Rails.application.routes.draw do
  root 'top#index'

  namespace :api, { format: 'json '} do
    get 'users', to: 'users#getAll'
    post 'users', to: 'users#entry'
  end
end
