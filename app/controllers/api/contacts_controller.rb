# Interface for Contact Models
class Api::ContactsController < ApplicationController
  before_action :set_contact, only: [:show, :update, :destroy]

  # Return a list of the current users contacts whose last name starts
  # with a spelcific letter. Defaults to 'A', for last names starting with
  # the letter 'A'.
  #
  # @return [Array<Contact,Model>] contact objects for the specified page
  def index
    # contacts = current_user.contacts
    contacts = User.find(params[:user_id]).contacts
      .all
      .where("last ILIKE '#{params[:letter]}%'")
      .order(:last, :first)
      .page(params[:page]).per_page(params[:per_page])
      # return a paginated array of contact objects
      render_pagination_as_json contacts
  end

  # Returns a single Contact Model objects according to a given ID number.
  #
  # @return [Contact, Model]
  def show
    render json: @contact
  end

  # Returns a single Contact Model object that was created using the submitted
  # user params.
  #
  # @return [Contact, Model]
  def create
    contact = User.find(params[:user_id]).contacts.build(contact_params)
    if contact.save
      render json: contact
    else
      render_errors contact
    end
  end

  # Takes user submitted params/attributes for a given Contact model and
  # updated the specified attributes. Return the updated model.
  #
  # @return [Contact,Model]
  def update
    if @contact.update(contact_params)
      render json: @contact
    else
      render_error @contact
    end
  end

  # For a given Contact Model ID number, it will destroy the corresponding
  # record.
  #
  # @return [nill]
  def destroy
    @contact.destroy
  end

  private

  # Setter for current instantiated Contact Model according to the given
  # ID number from params.
  def set_contact
    @contact = Contact.find(params[:id])
  end

  # Validator for the user submitted params representing a Contact Model.
  #
  # @return [Hash]
  def contact_params
    params.require(:contact)
      .permit(
        :id, :first, :last, :gender, :birthdate,
        :user_id, :created_at, :updated_at,
        phones_attributes: [ # Phone Models
          :id, :created_at, :updated_at,
          :country, :prefix, :areacode, :number, :type_of
        ],
        emails_attributes: [ # Email Models
          :id, :created_at, :updated_at,
          :address, :type_of
        ],
        addresses_attributes: [ # Address Models
          :id, :created_at, :updated_at,
          :street1, :street2, :city, :state, :zipcode, :country, :type_of
        ]
      )
  end
end
