class CommentsController < ApplicationController
    def index
        @comments = Comment.all
        render json:@comments.to_json(
            :include => {
                    :place => {
                        :only => [:name, :location, :image]
                    },
                    :user => {
                        :only => [:username, :bio, :image]
                    }
          }
        )
    end
   
    def show
        @comment = Comment.find_by(id: params[:id])
        render json: @comment.to_json(
            :include => {
                    :place => {
                        :only => [:name, :location, :image]
                    },
                    :user => {
                        :only => [:username, :bio, :image]
                    }
          }
        )
    end

    def create
        @comment = Comment.new(comment_params)
        @comment.save
        render json: @comment
    end


    private
    def comment_params
      params.require(:comment).permit(:id, :likes, :content, :user_id, :place_id)
        # users_attributes: [:id, :name], places_attributes: [:id, :name, :location, :image] )
    end
end
