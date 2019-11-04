class CommentsController < ApplicationController
    def index
        @comments = Comment.all
        render json:@comments.to_json(
            :include => {
                    :place => {
                        :only => [:name]
                    },
                    :user => {
                        :only => [:username, :bio, :image]
                    }
          }
        )
    end
   
    def show
        @comment = Comment.find_by(id: params[:id])
        render json: @comment
    end

    def create
        @comment = Comment.new(comment_params)
        @comment.save
        render json: @comment
    end

    def update
        @comment = Comment.find_by(id: params[:id])
        @comment.update(comment_params)
        render json: @comment
    end

    def destroy
        @comment = Comment.find_by(id: params[:id])
        @comment.destroy
    end

    private
    def comment_params
      params.require(:comment).permit(:id, :likes, :content, :user_id, :place_id)
    end
end
