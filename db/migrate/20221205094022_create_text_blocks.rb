class CreateTextBlocks < ActiveRecord::Migration[7.0]
  def change
    create_table :text_blocks do |t|
      t.text :entry
      t.string :format

      t.timestamps
    end
  end
end
