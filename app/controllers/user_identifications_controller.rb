class UserIdentificationsController < ApplicationController
  before_action :set_user_identification, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @user_identifications = UserIdentification.all
    respond_with(@user_identifications)
  end

  def show
    respond_with(@user_identification)
  end

  def new
    @user_identification = UserIdentification.new
    respond_with(@user_identification)
  end

  def edit
  end

  def create
    @user_identification = UserIdentification.new(user_identification_params)
    @user_identification.save
    respond_with(@user_identification)
  end

  def update
    @user_identification.update(user_identification_params)
    respond_with(@user_identification)
  end

  def destroy
    @user_identification.destroy
    respond_with(@user_identification)
  end

  private
    def set_user_identification
      @user_identification = UserIdentification.find(params[:id])
    end

    def user_identification_params
      params.require(:user_identification).permit(:type, :code, :imgpath, :user_id)
    end
end
