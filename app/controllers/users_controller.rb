class UsersController < ApplicationController
    def index
        @users = User.all
        render json:@users.to_json(
            :include => {
                    :comments => {
                        :only => [:likes, :content]
                    },
                    :places => {
                        :only => [:name, :location, :image]
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
                        :only => [:likes, :content]
                    },
                    :places => {
                        :only => [:name, :location, :image]
                    }
          }
        )
    end

    def create
        @user = User.new(user_params)
        @user.save

        if @user.save
            render json:@user
            # , status: :ok
        else 
            render json:{message: "username already taken"}
            #  mesages: 
        end
    end

    def addComments
        @comments = Comments.all
    end

    private
    def user_params
      params.require(:user).permit!
    #   (:id, :username, :bio, :image)
    end
end
