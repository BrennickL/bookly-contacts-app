namespace :load do |loader_namespace|
  desc "Loader for test data of the Contacts Model"
  task contacts: :environment do
    Contact.destroy_all

    100.times do
      Contact.create(
        last: Faker::Lorem.word,
        first: Faker::Lorem.word,
        gender: ['Male','Female'].sample,
        birthdate: Faker::Time.between(65.years.ago, Date.today, :all),
        user_id: User.first.id
      )
    end
    puts "Number of Contacts Loaded: #{Contact.all.count}"
    puts "First Contact Record:"
    puts Contact.first.last
  end

  desc "Easy loader for re-running all of the tasks at once"
  task :all do
    loader_namespace.tasks.each do |task|
      Rake::Task[task].invoke
    end
  end

end
