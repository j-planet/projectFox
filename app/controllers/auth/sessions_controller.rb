module Auth
  class SessionsController < ApplicationController
    skip_before_action :authenticate_user_from_token!

    # GET /auth/login
    def login
      @user = User.find_for_database_authentication(email: params[:email])

      return invalid_login_attempt unless @user

      if @user.valid_password?(params[:password])
        # not signning in , we dont need a session
        # sign_in :user, @user

        # retrun a jwt
        @jwt = JWT.encode({uid: @user.id, exp: 10.years.from_now.to_i}, Rails.application.secrets.secret_key_base)
        # avatar_url = @user.profile.avatar.url || @user.image || "/icons/hobbyist_ninja_male.png"
        # specialty_avatar_url = '/icons/' + @user.profile.specialty + '_ninja_' + @user.profile.sex.downcase + '.png' 

        user_info = {
          id:                 @user.id,
          username:           @user.username,
          # is_admin:           @user.is_admin,
          # headline:           @user.profile.headline,
          # avatar:             avatar_url,
          # specialty_avatar:   specialty_avatar_url,
          email:              @user.email,
        }

        render json: {access_token: @jwt, user_info: user_info}, status: 200
        # render json: @user, serializer: SessionSerializer, root: nil
      else
        invalid_login_attempt
      end
    end

    # POST /auth/register
    def register

      @user = User.find_for_database_authentication(email: params[:useremail])

      return invalid_signup_attempt if @user

      @user = User.create!({email: params[:useremail] , username: params[:username] , password: params[:userpassword] , password_confirmation: params[:userpasswordConfirmation] })

      # not signning in , we dont' need a session
      # sign_in :user, @user

      @jwt = JWT.encode({uid: @user.id, exp: 1.day.from_now.to_i}, Rails.application.secrets.secret_key_base)
      # avatar_url = @user.profile.avatar.url || @user.image || "/icons/hobbyist_ninja_male.png"
      # specialty_avatar_url = '/icons/' + @cuser.profile.specialty + '_ninja_' + @user.profile.sex.downcase + '.png' 
      
      user_info = {
        id:                 @user.id,
        name:               @user.username,
        # is_admin:           @user.is_admin,
        # headline:           @user.profile.headline,
        # avatar:             avatar_url,
        # specialty_avatar:   specialty_avatar_url,
        email:              @user.email,
      }

      render json: {access_token: @jwt, user_info: user_info}, status: 200   
    end 

    private

    def invalid_login_attempt
      warden.custom_failure!
      render json: {error: 'Invalid_login_attempt'}, status: :unauthorized
    end

    def invalid_signup_attempt
      warden.custom_failure!
      render json: {error: 'Email has already been taken'} , status: :unauthorized
    end

  end
end

# curl localhost:3000/auth/login --data "email=test1@test.com&password=test1test1"