class UsersController < ApplicationController
    def index
        @users = User.all
        render json:@users.to_json(
            :include => {
                    :comments => {
                        :only => [ :content]
                    },
                    :places => {
                        :only => [:name]
                    }
          }
        )
    end

    def show
        # @user = User.find(params[:id])
        @user = User.find_by(id: params[:id])
        render json: @user.to_json(
            :include => {
                    :comments => {
                        :only => [:content]
                    },
                    :places => {
                        :only => [:name]
                    }
          }
        )
    end

    def create
        @user = User.new(user_params)
        @user.save
    end

    def addComments
        @comments = Comments.all
    end

    private
    def user_params
      params.require(:user).permit!
    end
end
