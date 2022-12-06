Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "text_blocks#index"

  get "/blocks", to: "text_blocks#data"
  post "/add", to: "text_blocks#create"
  put "/edit/:id", to: "text_blocks#update"
  delete "/delete/:id", to: "text_blocks#destroy"
end
