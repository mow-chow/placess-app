class PlacesController < ApplicationController
    def index
        @places = Place.all
        render json:@places.to_json(
            :include => {
                :comments => {
                    :only => [ :content]
                }
            }
        )
    end

    def show
        @place = Place.find_by(id: params[:id])
        render json: @place.to_json(
            :include => {
                :comments => {
                    :only => [:content]
                }
            }
        )

    end

    def create
        @place = Place.new(place_params)
        @place.save
        render json: @place

    end

  

    private
    def place_params
      params.require(:place).permit(:id, :name, :location, :image)
    end
end
