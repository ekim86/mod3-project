require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get name" do
    get users_name_url
    assert_response :success
  end

end
