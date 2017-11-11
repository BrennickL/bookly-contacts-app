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
          zipcode: Faker::Address.zip,
          country: Faker::Address.country,
          type_of: ['Home','Work','Other'].sample,
          contact_id: contact.id
        )
      end
    end
    puts "Number of Contacts Loaded: #{Contact.all.count}"
    puts "First Contact Record: #{Contact.first.last}"
    puts '-' * 20
    puts "Number of Addresses Loaded: #{Address.all.count}"
    puts "First Address:"
    p Address.first
    puts '-' * 20
  end

  desc "Easy loader for re-running all of the tasks at once"
  task :all do
    loader_namespace.tasks.each do |task|
      Rake::Task[task].invoke
    end
  end

end
