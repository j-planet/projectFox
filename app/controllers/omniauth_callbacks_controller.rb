class OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def self.provides_callback_for(provider)
    class_eval %Q{
      def #{provider}

        # find_for_oauth can take current user, to merge different accounts @user = User.find_for_oauth(env["omniauth.auth"],current_user)
        # however we are sessionless so it mess things up 
        # took it out 
        @user = User.find_for_oauth(env["omniauth.auth"])

        if @user.persisted?

          # create jwt
          @jwt = JWT.encode({uid: @user.id, exp: 1.day.from_now.to_i}, Rails.application.secrets.secret_key_base) 
          avatar_url = @user.profile.avatar.url || @user.image || "/icons/hobbyist_ninja_male.png"
          
          redirect_to root_url + "?jwt=" + @jwt 
          
          # not signning in since we try to be stateless
          # sign_in_and_redirect @user, event: :authentication
          # set_flash_message(:notice, :success, kind: "#{provider}".capitalize) if is_navigational_format?
        else
          session["devise.#{provider}_data"] = env["omniauth.auth"]
          redirect_to new_user_registration_url
        end
      end
    }
  end

  [:twitter, :facebook, :linked_in].each do |provider|
    provides_callback_for provider
  end

end