# == Route Map
#
#                   Prefix Verb     URI Pattern                                   Controller#Action
#         new_user_session GET      /api/auth/sign_in(.:format)                   devise_token_auth/sessions#new
#             user_session POST     /api/auth/sign_in(.:format)                   devise_token_auth/sessions#create
#     destroy_user_session DELETE   /api/auth/sign_out(.:format)                  devise_token_auth/sessions#destroy
#        new_user_password GET      /api/auth/password/new(.:format)              devise_token_auth/passwords#new
#       edit_user_password GET      /api/auth/password/edit(.:format)             devise_token_auth/passwords#edit
#            user_password PATCH    /api/auth/password(.:format)                  devise_token_auth/passwords#update
#                          PUT      /api/auth/password(.:format)                  devise_token_auth/passwords#update
#                          POST     /api/auth/password(.:format)                  devise_token_auth/passwords#create
# cancel_user_registration GET      /api/auth/cancel(.:format)                    devise_token_auth/registrations#cancel
#    new_user_registration GET      /api/auth/sign_up(.:format)                   devise_token_auth/registrations#new
#   edit_user_registration GET      /api/auth/edit(.:format)                      devise_token_auth/registrations#edit
#        user_registration PATCH    /api/auth(.:format)                           devise_token_auth/registrations#update
#                          PUT      /api/auth(.:format)                           devise_token_auth/registrations#update
#                          DELETE   /api/auth(.:format)                           devise_token_auth/registrations#destroy
#                          POST     /api/auth(.:format)                           devise_token_auth/registrations#create
#  api_auth_validate_token GET      /api/auth/validate_token(.:format)            devise_token_auth/token_validations#validate_token
#         api_auth_failure GET      /api/auth/failure(.:format)                   devise_token_auth/omniauth_callbacks#omniauth_failure
#                          GET      /api/auth/:provider/callback(.:format)        devise_token_auth/omniauth_callbacks#omniauth_success
#                          GET|POST /omniauth/:provider/callback(.:format)        devise_token_auth/omniauth_callbacks#redirect_callbacks
#         omniauth_failure GET|POST /omniauth/failure(.:format)                   devise_token_auth/omniauth_callbacks#omniauth_failure
#                          GET      /api/auth/:provider(.:format)                 redirect(301)
#        api_user_contacts GET      /api/user/:user_id/contacts(.:format)         api/contacts#index
#                          POST     /api/user/:user_id/contacts(.:format)         api/contacts#create
#    api_contact_addresses GET      /api/contacts/:contact_id/addresses(.:format) api/addresses#index
#                          POST     /api/contacts/:contact_id/addresses(.:format) api/addresses#create
#              api_address GET      /api/addresses/:id(.:format)                  api/addresses#show
#                          PATCH    /api/addresses/:id(.:format)                  api/addresses#update
#                          PUT      /api/addresses/:id(.:format)                  api/addresses#update
#                          DELETE   /api/addresses/:id(.:format)                  api/addresses#destroy
#       api_contact_phones GET      /api/contacts/:contact_id/phones(.:format)    api/phones#index
#                          POST     /api/contacts/:contact_id/phones(.:format)    api/phones#create
#                api_phone GET      /api/phones/:id(.:format)                     api/phones#show
#                          PATCH    /api/phones/:id(.:format)                     api/phones#update
#                          PUT      /api/phones/:id(.:format)                     api/phones#update
#                          DELETE   /api/phones/:id(.:format)                     api/phones#destroy
#       api_contact_emails GET      /api/contacts/:contact_id/emails(.:format)    api/emails#index
#                          POST     /api/contacts/:contact_id/emails(.:format)    api/emails#create
#                api_email GET      /api/emails/:id(.:format)                     api/emails#show
#                          PATCH    /api/emails/:id(.:format)                     api/emails#update
#                          PUT      /api/emails/:id(.:format)                     api/emails#update
#                          DELETE   /api/emails/:id(.:format)                     api/emails#destroy
#              api_contact GET      /api/contacts/:id(.:format)                   api/contacts#show
#                          PATCH    /api/contacts/:id(.:format)                   api/contacts#update
#                          PUT      /api/contacts/:id(.:format)                   api/contacts#update
#                          DELETE   /api/contacts/:id(.:format)                   api/contacts#destroy
#                          GET      /*other(.:format)                             static#index
# 

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :user, shallow: true, only: [] do
      resources :contacts, only: [:index, :create]
    end
    resources :contacts, shallow: true, except: [:index, :create] do
      resources :addresses
      resources :phones
      resources :emails
    end
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
