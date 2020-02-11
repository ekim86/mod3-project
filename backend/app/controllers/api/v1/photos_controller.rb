class Api::V1::PhotosController < ApplicationController
  def index
    @photos = Photo.all
    # render json: @photos
    render json: @photos, except: [:created_at, :updated_at]
  end

  def show
    @photo = Photo.find(params[:id])
    render json: @photo
  end
  
  def update
    @photo = Photo.find(params[:id])
    @photo.update(photo_params)
    render json: @photo
  end

  def create
    @photo = Photo.create!(photo_params)
    render json: @photo
  end

  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy
    render json: @photo
  end

  private

  def photo_params
    params.require(:photo).permit(:title, :description, :img_url, :likes)
  end
end
