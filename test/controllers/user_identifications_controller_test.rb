require 'test_helper'

class UserIdentificationsControllerTest < ActionController::TestCase
  setup do
    @user_identification = user_identifications(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:user_identifications)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create user_identification" do
    assert_difference('UserIdentification.count') do
      post :create, user_identification: { code: @user_identification.code, imgpath: @user_identification.imgpath, type: @user_identification.type, user_id: @user_identification.user_id }
    end

    assert_redirected_to user_identification_path(assigns(:user_identification))
  end

  test "should show user_identification" do
    get :show, id: @user_identification
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @user_identification
    assert_response :success
  end

  test "should update user_identification" do
    patch :update, id: @user_identification, user_identification: { code: @user_identification.code, imgpath: @user_identification.imgpath, type: @user_identification.type, user_id: @user_identification.user_id }
    assert_redirected_to user_identification_path(assigns(:user_identification))
  end

  test "should destroy user_identification" do
    assert_difference('UserIdentification.count', -1) do
      delete :destroy, id: @user_identification
    end

    assert_redirected_to user_identifications_path
  end
end
