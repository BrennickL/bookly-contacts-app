class Api::AddressesController < ApplicationController
  before_action :set_address, only: [:show, :update, :destroy]

  def index
    render json: Contact.find(params[:contact_id]).addresses
  end

  def show
    render json: @address
  end

  def create
    address = Contact.find(params[:contact_id])
      .addresses.build(address_params)
    if address.save
      render json: address
    else
      render_errors address
    end
  end

  def update
    if @address.update(address_params)
      render json: @address
    else
      render_errors @address
    end
  end

  def destroy
    @address.destroy
  end

  private

  def set_address
    @address = Address.find(params[:id])
  end

  def address_params
    params.require(:address)
      .permit(
        :id, :street1, :street2, :city, :state, :zipcode, :country, :type_of,
        :created_at, :updated_at, :contact_id
      )
  end
end
