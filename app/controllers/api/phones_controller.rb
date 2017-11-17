class Api::PhonesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_phone, only: [:show, :update, :destroy]

  def index
    render json: Contact.find(params[:contact_id]).phones.all.order(:type_of)
  end

  def show
    render json: @phone
  end

  def create
    phone = Contact.find(params[:contact_id]).phones.build(phone_params)
    if phone.save
      render json: phone
    else
      render_errors phone
    end
  end

  def update
    if @phone.update(phone_params)
      render json: @phone
    else
      render_errors @phone
    end
  end

  def destroy
    @phone.destroy
  end

  private

  def set_phone
    @phone = Phone.find(params[:id])
  end

  def phone_params
    params.require(:phone)
      .permit(
        :type_of, :country, :prefix, :areacode, :number,
        :id, :created_at, :updated_at, :contact_id,
      )
  end
end
