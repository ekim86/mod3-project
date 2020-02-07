class Api::V1::PhotosController < ApplicationController
  def index
    @photos = Photo.all
    render json: @photos
    # might need to render json: @photos, except: [:created_at, :updated_at] if it's in our seed data
  end

  # def show
  # end
  
  def update
    @photo = photo.find(params[:id])
    @photo.update(photo_params)
    render json: @photo
  end

  def create
    @photo = Photo.create!(photo_params)
    render json: @photo
  end

  def destroy
    @photo = photo.find(params[:id])
    @photo.destroy
  end

  private

  def photo_params
    params.require(:photo).permit(:title, :description, :img_url, :likes)
  end
end
