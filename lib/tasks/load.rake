namespace :load do |loader_namespace|

  desc "Loader for test data of the User Model"
  task users: :environment do
    User.create(email: 'test@test.com',password: 'password')
  end

  desc "Loader for test data of the Contacts Model"
  task contacts: :environment do
    Contact.destroy_all

    100.times do
      contact = Contact.create(
        last: Faker::Lorem.word,
        first: Faker::Lorem.word,
        gender: ['Male','Female'].sample,
        birthdate: Faker::Time.between(65.years.ago, Date.today, :all),
        user_id: User.first.id
      )

      3.times do
        Address.create(
          street1: Faker::Address.street_name,
          street2: Faker::Address.secondary_address,
          city: Faker::Address.city,
          state: Faker::Address.state,
          zipcode: Faker::Address.zip.split('-')[0],
          country: Faker::Address.country,
          type_of: ['Home','Work','Other'].sample,
          contact_id: contact.id
        )
      end

      3.times do
        Faker::Config.locale = 'en-US'
        Phone.create(
          type_of: ['Home','Work','Other'].sample,
          country: Faker::PhoneNumber.subscriber_number(2),
          prefix: Faker::PhoneNumber.exchange_code,
          areacode: Faker::PhoneNumber.area_code,
          number: Faker::PhoneNumber.subscriber_number(4),
          contact_id: contact.id
        )
      end

      3.times do
        Email.create(
          contact_id: contact.id,
          type_of: ['Home','Work','Other'].sample,
          address: Faker::Internet.email
        )
      end
    end

    puts "Number of Emails Loaded: #{Email.all.count}"
    puts "First Contact Record:"
    p Email.first
    puts '-' * 20

    puts "Number of Phones Loaded: #{Phone.all.count}"
    puts "First Phone:"
    p Phone.first
    puts '-' * 20

    puts "Number of Addresses Loaded: #{Address.all.count}"
    puts "First Address:"
    p Address.first
    puts '-' * 20

    puts "Number of Contacts Loaded: #{Contact.all.count}"
    puts "First Contact Record: #{Contact.first.last}"
    puts '-' * 20

  end

  desc "Easy loader for re-running all of the tasks at once"
  task :all do
    loader_namespace.tasks.each do |task|
      Rake::Task[task].invoke
    end
  end

end
