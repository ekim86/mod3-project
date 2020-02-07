Rails.application.routes.draw do
  get 'users/name'
  get 'photos/index'
  get 'photos/show'
  get 'photos/create'
  get 'photos/update'
  get 'photos/destroy'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
