class RemoveTagsFromQuestions < ActiveRecord::Migration[7.1]
  def change
    remove_column :questions, :tag, :string
  end
end
